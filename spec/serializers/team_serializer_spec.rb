# frozen_string_literal: true
require 'rails_helper'

describe TeamSerializer do
  subject(:serializer) { TeamSerializer.new(team) }
  let(:team) { create(:team, name: 'Sulaco') }
  let(:json) { serializer.as_json }

  it 'produces the correct JSON' do
    expect(json).to match a_hash_including(
      name: 'Sulaco',
      id: 'sulaco'
    )
  end
end
