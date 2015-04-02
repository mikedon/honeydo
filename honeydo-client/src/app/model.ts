/// <reference path="_all.ts"/>
module honeydo {
	'use strict';

	export interface Task {
		id:number;
		name: string;
		dueDate: number;
		priority:TASK_PRIORITY;
	}

	export enum TASK_PRIORITY {CRITICAL=1, HIGH, MEDIUM, LOW}

	export interface Spouse {
		id: string;
		fullName: string;
	}

}