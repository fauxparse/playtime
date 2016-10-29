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
end
