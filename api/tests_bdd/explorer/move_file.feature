Feature: Explorer - Add file

  Background: There are data sources in the system

    Given there are mongodb data sources
      | host | port  | username | password | tls   | name             | database | collection | documentType | type     |
      | db   | 27017 | maf      | maf      | false | data-source-name | maf      | documents  | blueprints   | mongo-db |
      | db   | 27017 | maf      | maf      | false | templates        | dmt      | template   | blueprints   | mongo-db |

    Given there are documents for the data source "data-source-name" in collection "documents"
      | uid | parent_uid | name         | description | type                      |
      | 1   |            | root_package |             | templates/DMT/Package     |
      | 2   | 1          | document_1   |             | templates/SIMOS/Blueprint |

  # TODO: this only works from withing same data source
  Scenario: Move file (renaming)
    Given i access the resource url "/api/v2/explorer/move-file"
    And data modelling tool templates are imported
    When i make a "PUT" request
    """
    {
      "source": "data-source-name/root_package/document_1",
      "destination": "data-source-name/root_package/document_2"
    }
    """
    Then the response status should be "OK"
    And the response should contain
    """
    {
      "data" : {
        "name": "document_2"
      }
    }
    """
