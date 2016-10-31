# frozen_string_literal: true
class MemberSerializer < ActiveModel::Serializer
  attributes :name, :team_id

  def team_id
    object.team.to_param
  end
end
