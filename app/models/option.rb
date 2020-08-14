class Option < ApplicationRecord
  belongs_to :polling
  validates :name, presence: true, length: { minimum: 3, maximum: 25}
end
