class Vote < ApplicationRecord
  belongs_to :polling
  belongs_to :user
end
