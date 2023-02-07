class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :about_me, :avatar
end
