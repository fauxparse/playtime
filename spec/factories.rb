# frozen_string_literal: true
FactoryGirl.define do
  factory :member do
    user nil
    team
    admin false

    trait :with_user do
      user
    end
  end

  factory :team do
    name 'Sulaco'
  end
end
