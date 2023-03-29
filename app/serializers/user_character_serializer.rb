class UserCharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :avatar, :about

end