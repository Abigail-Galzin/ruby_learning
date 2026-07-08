class DropProductProviders < ActiveRecord::Migration[8.1]
  def up
    drop_table :product_providers
  end

  def down
    create_table :product_providers do |t|
      t.integer :product_id, null: false
      t.integer :provider_id, null: false
      t.timestamps
    end
  end
end
