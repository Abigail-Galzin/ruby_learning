class CreateJoinEmployeeTeams < ActiveRecord::Migration[8.1]
  create_join_table :employees, :teams, table_name: "employee_teams" do |t|
    t.index :employee_id
    t.index :team_id
  end
end
