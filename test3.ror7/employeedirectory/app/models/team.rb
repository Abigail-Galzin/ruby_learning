class Team < ApplicationRecord
  has_and_belongs_to_many :employees, join_table: :employee_teams
end
