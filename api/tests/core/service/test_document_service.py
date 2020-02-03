import unittest
from unittest import mock

from classes.blueprint import Blueprint

from classes.dto import DTO
from core.repository import Repository
from core.service.document_service import get_complete_document, DocumentService
from utils.data_structure.compare import pretty_eq

blueprint_1 = {
    "type": "system/SIMOS/Blueprint",
    "name": "Blueprint 1",
    "description": "First blueprint",
    "attributes": [
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "name"},
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "type"},
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "description"},
        {"attributeType": "blueprint_2", "type": "system/SIMOS/BlueprintAttribute", "name": "nested"},
        {"attributeType": "blueprint_2", "type": "system/SIMOS/BlueprintAttribute", "name": "reference"},
        {
            "attributeType": "blueprint_2",
            "type": "system/SIMOS/BlueprintAttribute",
            "name": "references",
            "dimensions": "*",
        },
    ],
    "storageRecipes": [
        {
            "type": "system/SIMOS/StorageRecipe",
            "name": "DefaultStorageRecipe",
            "description": "",
            "attributes": [
                {"name": "reference", "type": "system/DMT/Entity", "contained": False},
                {"name": "references", "type": "system/DMT/Entity", "contained": False},
            ],
        }
    ],
    "uiRecipes": [],
}

blueprint_2 = {
    "type": "system/SIMOS/Blueprint",
    "name": "Blueprint 2",
    "description": "Second blueprint",
    "attributes": [
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "name"},
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "type"},
        {"attributeType": "string", "type": "system/SIMOS/BlueprintAttribute", "name": "description"},
    ],
    "storageRecipes": [],
    "uiRecipes": [],
}


def get_blueprint(type: str):
    if type == "blueprint_1":
        return Blueprint(DTO(blueprint_1))
    if type == "blueprint_2":
        return Blueprint(DTO(blueprint_2))
    return None


class DocumentServiceTestCase(unittest.TestCase):
    def test_rename_attribute(self):
        document_repository: Repository = mock.Mock()

        document_1 = {
            "uid": "1",
            "name": "Parent",
            "description": "",
            "type": "blueprint_1",
            "nested": {"name": "Nested", "description": "", "type": "blueprint_2"},
        }

        def mock_get(document_id: str):
            if document_id == "1":
                return DTO(data=document_1.copy())
            return None

        document_repository.get = mock_get

        document_service = DocumentService(blueprint_provider=get_blueprint)
        document = document_service.rename_attribute(
            parent_id="1", attribute="nested", name="New name", document_repository=document_repository
        )

        assert isinstance(document.data, dict)

        actual = {"uid": "1", "nested": {"name": "New name", "description": "", "type": "blueprint_2"}}

        assert pretty_eq(actual, document.data) is None

    def test_get_complete_document(self):

        document_1 = {
            "uid": "1",
            "name": "Parent",
            "description": "",
            "type": "blueprint_1",
            "nested": {"name": "Nested", "description": "", "type": "blueprint_2"},
            "reference": {"_id": "2", "name": "Reference", "type": "blueprint_2"},
            "references": [
                {"_id": "3", "name": "Reference 1", "type": "blueprint_2"},
                {"_id": "4", "name": "Reference 2", "type": "blueprint_2"},
            ],
        }

        document_2 = {"uid": "2", "name": "Reference", "description": "", "type": "blueprint_2"}
        document_3 = {"uid": "3", "name": "Reference 1", "description": "", "type": "blueprint_2"}
        document_4 = {"uid": "4", "name": "Reference 2", "description": "", "type": "blueprint_2"}

        document_repository: Repository = mock.Mock()

        def mock_get(document_id: str):
            if document_id == "1":
                return DTO(data=document_1.copy())
            if document_id == "2":
                return DTO(data=document_2.copy())
            if document_id == "3":
                return DTO(data=document_3.copy())
            if document_id == "4":
                return DTO(data=document_4.copy())
            return None

        document_repository.get = mock_get

        root = get_complete_document(
            document_uid="1", document_repository=document_repository, blueprint_provider=get_blueprint
        )

        assert isinstance(root, dict)

        actual = {
            "uid": "1",
            "name": "Parent",
            "description": "",
            "type": "blueprint_1",
            "nested": {"name": "Nested", "description": "", "type": "blueprint_2"},
            "reference": document_2,
            "references": [document_3, document_4],
        }

        assert pretty_eq(actual, root) is None
