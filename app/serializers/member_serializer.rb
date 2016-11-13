# frozen_string_literal: true
class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :team_id

  def id
    object.to_param
  end

  def team_id
    object.team.to_param
  end
end
