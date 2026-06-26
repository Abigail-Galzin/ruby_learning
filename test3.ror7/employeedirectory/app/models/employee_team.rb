class EmployeeTeam < ApplicationRecord
  self.table_name = "employee_teams"

  belongs_to :employee
  belongs_to :team
end
