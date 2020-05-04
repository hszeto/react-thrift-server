namespace js com.demo

struct User {
  1: required i32 id
  2: optional string name
  3: optional string email
}

exception DemoServiceException {
  1: required string message
}

service DemoService {
  User getUserInfo(1: i32 userId) throws (1: DemoServiceException exp)
}
