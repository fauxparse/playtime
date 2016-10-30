class MemberSerializer < ActiveModel::Serializer
  attributes :name
  belongs_to :team
end
