# frozen_string_literal: true
require 'rails_helper'

describe EventList do
  subject(:event_list) do
    EventList.new(member, start_date: start_date)
  end

  let(:member) { create(:member) }
  let(:team) { member.team }
  let(:start_date) { Date.civil(2016, 11, 1) }
  let(:end_date) { Date.civil(2016, 11, 30) }

  around do |example|
    Time.use_zone('Wellington') do
      example.run
    end
  end

  before do
    create(:event, :scheduled, team: team)
    once = IceCube::Schedule.new(Time.zone.local(2016, 11, 13, 20))
    create(:event, team: team, schedule: once)
    never = IceCube::Schedule.new(Time.zone.local(2016, 10, 31, 23))
    create(:event, team: team, schedule: never)
  end

  describe '#all' do
    subject(:occurrences) { event_list.all }

    it 'has four occurrences' do
      expect(occurrences).to have_exactly(5).items
    end

    it 'has the correct start times' do
      expect(event_list.map(&:starts_at))
        .to eq [
          Time.zone.local(2016, 11, 4, 21),
          Time.zone.local(2016, 11, 11, 21),
          Time.zone.local(2016, 11, 13, 20),
          Time.zone.local(2016, 11, 18, 21),
          Time.zone.local(2016, 11, 25, 21)
        ]
    end
  end
end
