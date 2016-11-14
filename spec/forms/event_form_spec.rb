# frozen_string_literal: true
require 'rails_helper'

shared_examples_for 'a valid form' do
  let(:json) do
    event.schedule.as_json.deep_transform_keys do |key|
      key.to_s =~ /^\d+$/ ? key.to_i : key.to_sym
    end
  end

  it { is_expected.to be_valid }

  it 'produces the correct schedule' do
    form.valid?
    expect(json).to match a_hash_including(expected_json)
  end
end

shared_examples_for 'an invalid form' do
  it { is_expected.not_to be_valid }

  it 'has the correct errors' do
    form.valid?

    expected_errors.each do |field|
      expect(form).to have(1).error_on field
    end
  end
end

describe EventForm do
  subject(:form) do
    EventForm.new(event, ActionController::Parameters.new(event: attributes))
  end
  let(:event) { team.events.new }
  let(:team) { FactoryGirl.create(:team) }

  context 'with empty parameters' do
    let(:attributes) { {} }
    let(:expected_errors) { [:name] }

    it_behaves_like 'an invalid form'
  end

  context 'with basic parameters' do
    let(:attributes) do
      {
        name: 'Bug Hunt',
        start: '2016-10-21T21:00:00+13:00',
        end: '2016-10-21T22:00:00+13:00',
        repeat: false
      }
    end

    let(:expected_json) do
      {
        start_time: { time: '2016-10-21T08:00:00Z', zone: 'Wellington' },
        end_time: { time: '2016-10-21T09:00:00Z', zone: 'Wellington' },
        rrules: []
      }
    end

    it_behaves_like 'a valid form'
  end

  context 'with complex repeat parameters' do
    let(:attributes) do
      {
        name: 'Bug Hunt',
        start: '2016-10-21T21:00:00+13:00',
        end: '2016-10-21T22:00:00+13:00',
        repeat: repeat
      }
    end

    let(:expected_json) do
      {
        start_time: { time: '2016-10-21T08:00:00Z', zone: 'Wellington' },
        end_time: { time: '2016-10-21T09:00:00Z', zone: 'Wellington' },
        rrules: [repeat_json]
      }
    end

    context 'for a daily event' do
      let(:repeat) { { interval: 'day' } }
      let(:repeat_json) do
        {
          validations: {},
          rule_type: 'IceCube::DailyRule',
          interval: 1
        }
      end

      it_behaves_like 'a valid form'
    end

    context 'for a weekly event' do
      let(:repeat) { { interval: 'week', weekdays: [5, 6] } }
      let(:repeat_json) do
        {
          validations: { day: [5, 6] },
          rule_type: 'IceCube::WeeklyRule',
          interval: 1,
          week_start: 0
        }
      end

      it_behaves_like 'a valid form'
    end

    context 'for the 21st of every second month' do
      let(:repeat) { { interval: 'month' } }

      let(:repeat_json) do
        {
          validations: { day_of_month: [21] },
          rule_type: 'IceCube::MonthlyRule',
          interval: 1
        }
      end

      it_behaves_like 'a valid form'
    end

    context 'for the last Friday of every second month' do
      let(:repeat) do
        {
          interval: 'month',
          step: 2,
          week_of_month: -1
        }
      end

      let(:repeat_json) do
        {
          validations: { day_of_week: { 5 => [-1] } },
          rule_type: 'IceCube::MonthlyRule',
          interval: 2
        }
      end

      it_behaves_like 'a valid form'
    end

    context 'for the 21st of October every year' do
      let(:repeat) { { interval: 'year' } }

      let(:repeat_json) do
        {
          validations: {},
          rule_type: 'IceCube::YearlyRule',
          interval: 1
        }
      end

      it_behaves_like 'a valid form'
    end
  end
end
