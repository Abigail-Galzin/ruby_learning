class Product < ApplicationRecord
  has_many :purchase_orders, dependent: :destroy

  has_many :providers, through: :purchase_orders

  enum :status, { active: 0, discontinued: 1 }

  
end
