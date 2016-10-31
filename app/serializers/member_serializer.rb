# frozen_string_literal: true
class MemberSerializer < ActiveModel::Serializer
  attributes :name
  belongs_to :team
end
