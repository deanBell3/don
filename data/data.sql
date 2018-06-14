

create table likes(
id bigserial primary key,
post_id int references posts(id),
liked_by varchar(255) unique references off_users(username) on delete cascade
);

