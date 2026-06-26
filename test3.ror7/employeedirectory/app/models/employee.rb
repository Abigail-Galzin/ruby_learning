class Employee < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :employee_number, presence: true, uniqueness: true

  belongs_to :position

  has_and_belongs_to_many :teams, join_table: :employee_teams
end
