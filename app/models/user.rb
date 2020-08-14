class User < ApplicationRecord
  has_many :votes, dependent: :destroy
  has_many :pollings, through: :votes
  
  before_save  { self.email = email.downcase }
  validates :name, presence: true,  length: { minimum: 3, maximum: 25 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: {maximum: 300}, 
                    uniqueness: { case_sensitive: false },
                    format: { with: VALID_EMAIL_REGEX}
  has_secure_password
end
