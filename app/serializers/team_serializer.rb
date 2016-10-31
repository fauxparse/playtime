# frozen_string_literal: true
class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name

  def id
    object.to_param
  end
end
