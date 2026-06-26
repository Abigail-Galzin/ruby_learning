class AddIsActiveToEmployeeTeams < ActiveRecord::Migration[8.1]
  def change
    add_column :employee_teams, :is_active, :boolean
  end
end
