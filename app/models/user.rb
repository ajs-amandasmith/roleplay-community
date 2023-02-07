class User < ApplicationRecord
  has_secure_password

  has_many :characters
  has_many :groups

  validates :username, presence: true, uniqueness: true
end
