import os, json

f = os.open

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as fd:
        fd.write(content)
    print(f'Was-={_path}')
