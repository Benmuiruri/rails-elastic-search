25.times do |i|
  Post.create(title: Faker::Book.title, body: Faker::Lorem.paragraph(sentence_count: 3))
end

Post.reindex
