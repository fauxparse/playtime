# frozen_string_literal: true
require 'rails_helper'

describe RecurrenceRuleSerializer do
  subject(:serializer) { RecurrenceRuleSerializer.new(rule, options) }
  let(:options) { { schedule: schedule } }
  let(:json) { serializer.as_json }
  let(:schedule) do
    IceCube::Schedule.new(Time.zone.now, end_time: 1.hour.from_now) do |s|
      s.add_recurrence_rule(rule)
    end
  end

  context 'a daily rule' do
    let(:rule) do
      IceCube::Rule.daily(1)
    end

    it 'produces the correct JSON' do
      expect(json).to match a_hash_including(
        interval: 'day',
        step: 1
      )
    end
  end

  context 'a weekly rule' do
    let(:rule) do
      IceCube::Rule.weekly(1).day(:friday, :saturday)
    end

    it 'produces the correct JSON' do
      expect(json).to match a_hash_including(
        interval: 'week',
        step: 1,
        weekdays: [5, 6]
      )
    end
  end

  context 'a monthly rule' do
    let(:rule) do
      IceCube::Rule.monthly(1)
    end

    it 'produces the correct JSON' do
      expect(json).to match a_hash_including(
        interval: 'month',
        step: 1,
        day_of_month: Time.zone.now.day
      )
    end

    context 'by week' do
      let(:rule) do
        IceCube::Rule.monthly(1).day_of_week(5 => [-1])
      end

      it 'produces the correct JSON' do
        expect(json).to match a_hash_including(
          interval: 'month',
          step: 1,
          week_of_month: -1
        )
      end
    end
  end

  context 'a yearly rule' do
    let(:rule) do
      IceCube::Rule.yearly(1)
    end

    it 'produces the correct JSON' do
      expect(json).to match a_hash_including(
        interval: 'year',
        step: 1
      )
    end
  end
end
