# -*- coding: utf-8 -*-
from __future__ import annotations

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _docxutil import write_docx, write_qa
from pack_a02_a04 import pack_a02, pack_a03, pack_a04
from pack_a05_a12 import pack_a05, pack_a06, pack_a07, pack_a08, pack_a09, pack_a10, pack_a11, pack_a12

FOOT = (
    "【使用与时效】本文供江城知音对应智能体私有喂养，禁止改成1.docx、禁止拷给其他角色。"
    "票价、班次、开闭园、演艺场次以官方公众号、网站和窗口当日公示为准。"
    "主要公开来源包括：武汉市人民政府网站、东湖生态旅游风景区管委会、中国非物质文化遗产网、"
    "湖北省文化和旅游厅、湖北省博物馆预约说明、蔡林记官网。整理时间2026年9月。"
)


def run_pack(fn):
    folder, disc, docs, agent, qa = fn()
    for name, title, paras in docs:
        write_docx(folder, name, title, disc, paras + [FOOT])
    write_qa(folder, agent, qa)
    readme = folder / "README.md"
    readme.write_text(
        f"# {agent}\n\n上传本目录全部 .docx，再按 `{agent}QA库.md` 录入 QA 并打标签。"
        "自动学习关闭，来源不要选互联网。\n",
        encoding="utf-8",
    )


def main():
    for fn in (
        pack_a02, pack_a03, pack_a04, pack_a05, pack_a06, pack_a07,
        pack_a08, pack_a09, pack_a10, pack_a11, pack_a12,
    ):
        run_pack(fn)


if __name__ == "__main__":
    main()
