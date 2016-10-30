require 'digest/md5'

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :avatar
  has_many :members

  def avatar
    hash = Digest::MD5.hexdigest(object.email)
    "https://www.gravatar.com/avatar/#{hash}?s=192"
  end
end
