class Product < ApplicationRecord
  has_many :purchase_orders, dependent: :destroy
  has_many :providers, through: :purchase_orders

  enum :status, { active: 0, discontinued: 1, low_stock: 2 }

  CATEGORIES = %w[electronics clothing food books premium].freeze

  validates :name, :price, presence: true
  validates :price, numericality: { greater_than: 0}
  validates :category, presence: true, inclusion: { in: CATEGORIES }

  before_save :check_reorder_level

  def validate_stock
    if stock > 0
      stock -= 1
    end
  end

  def check_reorder_level
    if stock <= reorder_level
      low_stock!
    end
  end

  def self.premium_category
    "premium"
  end
end
