#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  HandleScope scope;
  return scope.Close(String::New("app"));
}

void init(Handle<Object> target) {
  NODE_SET_METHOD(target, "binding", Method);
}
NODE_MODULE(binding, init)