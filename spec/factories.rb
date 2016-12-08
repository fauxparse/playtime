# frozen_string_literal: true
FactoryGirl.define do
  factory :member do
    name 'Ripley'
    user nil
    team
    admin false

    trait :with_user do
      user
    end

    factory :admin do
      name 'Dallas'
      user
      admin true
    end
  end

  factory :team do
    name 'Sulaco'
  end

  factory :invitation do
    sponsor factory: :admin
    email

    after :build do |invitation|
      invitation.member ||= \
        FactoryGirl.create(:member, team: invitation.sponsor.team)
    end
  end

  factory :event do
    team
    name 'Bug Hunt'

    trait :scheduled do
      schedule do
        IceCube::Schedule.new(
          Time.zone.local(2016, 10, 21, 21),
          duration: 1.hour
        ).tap do |schedule|
          schedule.add_recurrence_rule IceCube::Rule.weekly.day(:friday)
        end
      end
    end

    trait :terminating do
      schedule do
        IceCube::Schedule.new(
          Time.zone.local(2016, 10, 21, 21),
          duration: 1.hour
        ).tap do |schedule|
          schedule.add_recurrence_rule(
            IceCube::Rule.weekly.day(:friday).count(6)
          )
        end
      end
    end
  end
end
