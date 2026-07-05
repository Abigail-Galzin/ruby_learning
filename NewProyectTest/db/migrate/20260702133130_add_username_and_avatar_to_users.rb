class AddUsernameAndAvatarToUsers < ActiveRecord::Migration[8.1]
  def change
    rename_column :users, :name, :username
    add_column :users, :avatar, :string
  end
end
