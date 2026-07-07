class Provider < ApplicationRecord
  has_many :purchase_orders, dependent: :destroy

  has_many :products, through: :purchase_orders
end
