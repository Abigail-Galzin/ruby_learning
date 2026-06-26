class Position < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :employees
end
