# frozen_string_literal: true
class User < ApplicationRecord
  include Clearance::User

  has_many :members, -> { includes(:team) }
  has_many :teams, through: :members
end
