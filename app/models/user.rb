class User < ApplicationRecord
  has_secure_password

  has_many :characters
  has_many :groups
end
