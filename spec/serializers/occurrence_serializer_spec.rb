# frozen_string_literal: true
require 'rails_helper'

describe OccurrenceSerializer do
  subject(:serializer) do
    ActiveModelSerializers::SerializableResource.new(resource)
  end
  let(:json) { serializer.as_json }
  let(:event) { create(:event, :scheduled) }

  describe 'for a single occurrence' do
    let(:resource) { event.occurrences.first }

    it 'serializes the team, event, date, and time' do
      expect(json).to match a_hash_including(
        team:  'sulaco',
        event: 'bug-hunt',
        date:  '2016-10-21',
        time:  '2016-10-21T21:00:00+13:00'
      )
    end
  end

  describe 'for multiple occurrences' do
    let(:resource) do
      event.occurrences.between('2016-11-01', '2016-11-30')
    end

    it 'serializes the team, event, date, and time' do
      expect(json).to eq [
        {
          team:  'sulaco',
          event: 'bug-hunt',
          date:  '2016-11-04',
          time:  '2016-11-04T21:00:00+13:00'
        },
        {
          team:  'sulaco',
          event: 'bug-hunt',
          date:  '2016-11-11',
          time:  '2016-11-11T21:00:00+13:00'
        },
        {
          team:  'sulaco',
          event: 'bug-hunt',
          date:  '2016-11-18',
          time:  '2016-11-18T21:00:00+13:00'
        },
        {
          team:  'sulaco',
          event: 'bug-hunt',
          date:  '2016-11-25',
          time:  '2016-11-25T21:00:00+13:00'
        }
      ]
    end
  end
end
