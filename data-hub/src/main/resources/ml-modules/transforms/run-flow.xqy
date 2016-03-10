xquery version "1.0-ml";

module namespace runFlow = "http://marklogic.com/rest-api/transform/run-flow";

import module namespace flow = "http://marklogic.com/hub-in-a-box/flow-lib"
at "/com.marklogic.hub/lib/flow-lib.xqy";

declare function runFlow:transform(
  $context as map:map,
  $params as map:map,
  $content as document-node()
  ) as document-node()
{
  let $entityName := map:get($params, 'entity-name')
  let $flowName := map:get($params, 'flow-name')
  let $flowType := map:get($params, 'flow-type')

  let $flow := flow:get-flow($entityName,$flowName,$flowType)

  let $uri := map:get($context, 'uri')

  return flow:run-plugins($flow, $uri, $content, $params)

};
