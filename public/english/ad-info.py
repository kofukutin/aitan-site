import os
import glob

# 処理対象ディレクトリ（必要に応じて変更）
target_dir = "./"  # 例: "./articles/"

# 全ての.mdファイルを取得（再帰的に）
md_files = glob.glob(os.path.join(target_dir, "**", "*.md"), recursive=True)

for file_path in md_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 書き換え内容
    new_content = content.replace('class="ad-center"', 'class="info-center"')
    new_content = new_content.replace('（広告掲載予定）', '（おすすめ情報予定）')

    # 差分があれば上書き保存
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✔ 書き換え済み: {file_path}")
    else:
        print(f"スキップ: {file_path}")
