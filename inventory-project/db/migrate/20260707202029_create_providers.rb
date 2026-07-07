class CreateProviders < ActiveRecord::Migration[8.1]
  def change
    create_table :providers do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.integer :rating

      t.timestamps
    end
  end
end
