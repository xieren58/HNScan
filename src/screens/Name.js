import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { usePage, useQuery, Spacer } from "@urkellabs/ucl";

// Components
import NameSummary from "components/name/NameSummary";
import NameAdvanced from "components/name/NameAdvanced";
import NameHistory from "components/name/NameHistory";

// Error Boundary
import NameError from "screens/errors/NameError";

//@todo remove this.

const NameRecords = () => <div>todo</div>;

function NameView({ name, page, changePage, url }) {
  const { data: nameData } = useQuery("/names/" + name);

  //@todo move this to NameHistory component, since we want to be able to filter it effectively.
  //@todo I don't think the previous version of this supported pagination.
  //When we move this to a container, support pagination
  const { data } = useQuery("/names/" + name + "/history");
  return (
    <>
      <NameSummary name={nameData} />
      <Spacer />
      <NameAdvanced name={nameData} />
      {name.records && <NameRecords records={name.records} />}
      <Spacer />
      <NameHistory
        history={data.result}
        page={page}
        pages={Math.ceil(data.total / 25)}
        url={"/name/" + name}
      />
    </>
  );
}

export default function Name() {
  const page = usePage();
  const { name } = useParams();
  return (
    <NameError name={name}>
      <Suspense fallback={<div>Loading...</div>}>
        <NameView name={name} page={page} />
      </Suspense>
    </NameError>
  );
}
