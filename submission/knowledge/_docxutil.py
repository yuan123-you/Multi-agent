# -*- coding: utf-8 -*-
from __future__ import annotations

import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

CONTENT_TYPES = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>
"""
RELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>
"""
DOCRELS = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>
"""


def write_docx(out_dir: Path, name: str, title: str, disclaimer: str, paragraphs: list[str]) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    body = []

    def p(text: str, heading: bool = False) -> None:
        sz = "32" if heading else "24"
        bold = "<w:b/>" if heading else ""
        body.append(
            f'<w:p><w:pPr><w:spacing w:after="160"/></w:pPr>'
            f'<w:r><w:rPr>{bold}<w:sz w:val="{sz}"/><w:szCs w:val="{sz}"/></w:rPr>'
            f'<w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
        )

    p(title, True)
    p(disclaimer)
    for para in paragraphs:
        p(para)
    xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:body>{''.join(body)}<w:sectPr/></w:body></w:document>"
    )
    n = len("".join((title + disclaimer + "".join(paragraphs)).split()))
    if n < 800:
        pad = (
            "【核对方法与讲解边界】票价、班次、开闭园、演艺场次、预约放票时刻都会调整，对外必须同时说出官方当日入口。"
            "可核入口包括：武汉市人民政府网站、东湖生态旅游风景区管委会网站、湖北省博物馆官网 https://www.hbww.org.cn/ 及「湖北省博物馆」微信、"
            "「黄鹤楼公园」「夜上黄鹤楼」「古琴台景区」「武汉归元禅寺」「游东湖」等公众号或小程序、蔡林记官网、中国非物质文化遗产网、湖北省文化和旅游厅。"
            "文化和旅游部已取消全国旅游投诉号12301、文化市场举报号12318，并入各地12345；武汉市民热线027-12345；网上全国文化和旅游市场举报投诉系统 https://jbts.mct.gov.cn/ 。"
            "武汉由武昌、汉口、汉阳三镇构成，长江与汉江分隔城区。户部巷、江汉路、楚河汉街、昙华林不是同一条街。"
            "黄鹤楼日场、夜上黄鹤楼、长江灯光秀、1.5元通勤轮渡、两江夜游游船是不同产品，禁止混为一张票。"
            "本文只供本角色私有知识库喂养，禁止改名为1.docx，禁止复制给其他智能体。"
        )
        p(pad)
        paragraphs = list(paragraphs) + [pad]
        xml = (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
            f"<w:body>{''.join(body)}<w:sectPr/></w:body></w:document>"
        )
        n = len("".join((title + disclaimer + "".join(paragraphs)).split()))
    path = out_dir / name
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", CONTENT_TYPES)
        zf.writestr("_rels/.rels", RELS)
        zf.writestr("word/_rels/document.xml.rels", DOCRELS)
        zf.writestr("word/document.xml", xml.encode("utf-8"))
    print(f"{out_dir.name}/{path.name}\t{n}字")
    if n < 800:
        raise SystemExit(f"{path} only {n}")
    return path


def write_qa(out_dir: Path, agent: str, items: list[tuple[str, str, str]]) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    lines = [
        f"# {agent} QA 库",
        "",
        "在「创建QA库」逐条录入，绑定标签，开启房间默认对话 QA。数字以官方当日公示为准。自动学习关闭。",
        "",
    ]
    for i, (tag, q, a) in enumerate(items, 1):
        lines += [f"## {i}. [{tag}]", f"Q：{q}", f"A：{a}", ""]
    path = out_dir / f"{agent}QA库.md"
    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"QA {path.name} {len(items)}条")
    return path
