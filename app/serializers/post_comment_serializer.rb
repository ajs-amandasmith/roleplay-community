class PostCommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user, :character

  def user
    {
      id: object.user.id,
      username: object.user.username
    }
  end

  def character
    {
      id: object.character.id,
      name: object.character.name
    }
  end

end