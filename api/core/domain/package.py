from typing import Dict, List
from core.enums import DMT


class Dependency:
    # TODO: Prod standard data_source as default ie. npm.org
    # TODO: Enforce a semver system on version
    def __init__(self, package: str, version: str = "latest", data_source: str = "templates", alias: str = None):
        self.package = package
        self.version = version
        self.data_source = data_source
        self.alias = alias

    @classmethod
    def from_dict(cls, a_dict):
        return cls(
            package=a_dict["package"],
            version=a_dict["version"],
            data_source=a_dict["data_source"],
            alias=a_dict["alias"],
        )

    def to_dict(self):
        return {"package": self.package, "version": self.version, "data_source": self.data_source, "alias": self.alias}


class Package:
    def __init__(
        self,
        name: str,
        dependencies: List[Dependency] = None,
        description: str = None,
        type: str = DMT.PACKAGE.value,
        content: List[Dict] = None,
        is_root: bool = False,
    ):
        self.name = name
        self.description = description
        self.type = type
        self.dependencies = [] if not dependencies else dependencies
        self.content = [] if not content else content
        self.is_root = is_root
        self.storage_recipes = []

    @classmethod
    def from_dict(cls, adict):
        instance = cls(
            name=adict["name"],
            description=adict.get("description"),
            content=adict.get("content", ""),
            dependencies=[Dependency.from_dict(dependency) for dependency in adict.get("dependencies", [])],
            type=adict.get("type", DMT.PACKAGE.value),
            is_root=adict.get("isRoot", "false"),
        )

        instance.storage_recipes = adict.get("storageRecipes", [])
        return instance

    def get_values(self, attribute_name):
        data = self.to_dict()
        if attribute_name in data:
            return data[attribute_name]
        else:
            return None

    def to_dict(self):
        result = {
            "name": self.name,
            "description": self.description,
            "type": self.type,
            "content": self.content,
            "dependencies": [dependency.to_dict() for dependency in self.dependencies],
            "isRoot": self.is_root,
            "storageRecipes": self.storage_recipes,
        }
        return result

    def __eq__(self, other):
        return self.to_dict() == other.to_dict()
