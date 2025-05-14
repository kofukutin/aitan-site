import os
import re

# 対象ディレクトリ
target_dir = "content/word"

# 改良版パターン：
# 例: ](/word/store) → ](/word/store/)
pattern = re.compile(r'(?<=\]\()(/word/[^/\s)]+)(?=\))')

def add_trailing_slash_to_links(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = pattern.sub(r'\1/', content)

    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ 変換完了：{file_path.replace(os.sep, '/')}")
    else:
        print(f"🟡 変更なし：{file_path.replace(os.sep, '/')}")

# .mdファイルすべてを処理
for root, dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith(".md"):
            file_path = os.path.join(root, file)
            add_trailing_slash_to_links(file_path)
