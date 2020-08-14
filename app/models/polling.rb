class Polling < ApplicationRecord
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options
  validates_length_of :options, :minimum => 4, :maximum => 4
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  default_scope -> { order(created_at: :desc) }
  validates :question, presence: true, length: { minimum: 10, maximum: 300}
end
