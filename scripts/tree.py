import os
from pathlib import Path
from typing import List
def generate_tree(root_path: str, exclude_dirs: List[str] = None, exclude_files: List[str] = None) -> str:
    if exclude_dirs is None:
        exclude_dirs = ['.git', 'node_modules', '__pycache__', 'venv']
    if exclude_files is None:
        exclude_files = ['.DS_Store', '.gitignore']
    tree = []
    root_path = Path(root_path)
    def add_to_tree(path: Path, prefix: str = ''):
        if path.is_file():
            if path.name not in exclude_files:
                tree.append(f"{prefix}├── {path.name}")
        else:
            if path.name not in exclude_dirs:
                if path != root_path:
                    tree.append(f"{prefix}├── {path.name}/")
                    prefix += "│   "
                for item in sorted(path.iterdir()):
                    add_to_tree(item, prefix)
    add_to_tree(root_path)
    return '\n'.join(tree)
if __name__ == '__main__':
    project_path = '/Users/shalom_bergman/kodcode2/Data_engineering_course/client_project/CreditPro'
    tree_output = generate_tree(project_path)
    print(f"Project Tree for: {project_path}\n")
    print(tree_output)