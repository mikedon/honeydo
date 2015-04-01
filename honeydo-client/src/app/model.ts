/// <reference path="_all.ts"/>
module honeydo {
	'use strict';

	export interface Task {
		id:number;
		name: string;
		dueDate: number;
	}

	export enum SORT_BY {DUE_DATE, NAME, PRIORITY};

	export enum TASK_PRIORITY {CRITICAL, HIGH, MEDIUM, LOW}

	export interface Spouse {
		id: string;
		fullName: string;
	}

}