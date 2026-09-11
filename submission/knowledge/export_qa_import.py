# -*- coding: utf-8 -*-
"""把各角色 QA 库导出为智小途云可导入的 CSV / Excel。

列名按平台「创建QA库」常见模板：问题、答案、标签。
验收手册 3.2.3 / 3.3.3 要求每条绑定分类标签并开启房间对话 QA。
"""
from __future__ import annotations

import csv
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent


def parse_md(path: Path) -> list[tuple[str, str, str]]:
    text = path.read_text(encoding="utf-8")
    items: list[tuple[str, str, str]] = []
    current_tag = "未分类"

    # A01: ## 标签：xxx  +  N. Q： / A：
    # A02+: ## N. [tag]  + Q： / A：
    heading_tag = re.compile(r"^##\s+标签[：:]\s*(.+?)\s*$")
    heading_num = re.compile(r"^##\s+\d+\.\s*\[([^\]]+)\]\s*$")
    q_line = re.compile(r"^(?:\d+\.\s*)?Q[：:]\s*(.+?)\s*$")
    a_line = re.compile(r"^A[：:]\s*(.+?)\s*$")

    pending_q = None
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        m = heading_tag.match(line)
        if m:
            current_tag = m.group(1).strip()
            continue
        m = heading_num.match(line)
        if m:
            current_tag = m.group(1).strip()
            continue
        m = q_line.match(line)
        if m:
            pending_q = m.group(1).strip()
            continue
        m = a_line.match(line)
        if m and pending_q:
            items.append((pending_q, m.group(1).strip(), current_tag))
            pending_q = None
    return items


def write_csv(path: Path, rows: list[tuple[str, str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["问题", "答案", "标签"])
        for q, a, tag in rows:
            w.writerow([q, a, tag])


def _sheet_xml(rows: list[tuple[str, str, str]]) -> bytes:
    def cell(col: str, r: int, text: str) -> str:
        return (
            f'<c r="{col}{r}" t="inlineStr"><is><t xml:space="preserve">'
            f"{escape(text)}</t></is></c>"
        )

    body = ['<row r="1">', cell("A", 1, "问题"), cell("B", 1, "答案"), cell("C", 1, "标签"), "</row>"]
    for i, (q, a, tag) in enumerate(rows, start=2):
        body.append(f'<row r="{i}">')
        body.append(cell("A", i, q))
        body.append(cell("B", i, a))
        body.append(cell("C", i, tag))
        body.append("</row>")
    xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f"<sheetData>{''.join(body)}</sheetData></worksheet>"
    )
    return xml.encode("utf-8")


CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>
"""
RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>
"""
WB = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="QA" sheetId="1" r:id="rId1"/></sheets>
</workbook>
"""
WB_RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>
"""


def write_xlsx(path: Path, rows: list[tuple[str, str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", CONTENT_TYPES)
        zf.writestr("_rels/.rels", RELS)
        zf.writestr("xl/workbook.xml", WB)
        zf.writestr("xl/_rels/workbook.xml.rels", WB_RELS)
        zf.writestr("xl/worksheets/sheet1.xml", _sheet_xml(rows))


def main() -> None:
    total = 0
    for md in sorted(ROOT.glob("*/*QA库.md")):
        rows = parse_md(md)
        if not rows:
            raise SystemExit(f"未解析到 QA：{md}")
        stem = md.stem.replace("QA库", "QA导入表")
        write_csv(md.parent / f"{stem}.csv", rows)
        write_xlsx(md.parent / f"{stem}.xlsx", rows)
        print(f"{md.parent.name}\t{len(rows)}条")
        total += len(rows)
    print(f"合计 {total} 条")


if __name__ == "__main__":
    main()
