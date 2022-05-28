//@ts-nocheck
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getPerks,
  incrementPerkView,
  getPerk,
  incrementPerkUse,
} from "../../services/PerksService";

export const useGetPerks = () => {
  return useQuery("perks", getPerks);
};

export const useIncrementPerkView = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ perkId, views }) => incrementPerkView({ perkId, views }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("perks");
      },
    }
  );
};

export const useGetPerk = (perkId) => {
  return useQuery(["perks", perkId], () => getPerk(perkId), {
    enabled: !!perkId,
  });
};

export const useIncrementPerkUse = () => {
  const queryClient = useQueryClient();
  return useMutation(({ perkId, uses }) => incrementPerkUse({ perkId, uses }), {
    onSuccess: () => {
      queryClient.invalidateQueries("perks");
    },
  });
};
